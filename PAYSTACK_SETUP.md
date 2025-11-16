# Paystack Payment Integration Guide

## Overview
The application payment page now uses **Paystack** exclusively for processing application fees. This provides a secure, instant, and user-friendly payment experience.

## Features

### ✅ What's Included
- **Paystack Inline Payment**: Secure payment popup
- **Multiple Payment Methods**:
  - Card payments (Visa, Mastercard, Verve)
  - Bank Transfer
  - USSD
  - Mobile Money
- **Instant Payment Verification**: No manual verification needed
- **Automatic Transaction Reference**: Generated and stored automatically
- **Payment Status Tracking**: Real-time payment confirmation
- **Disabled Submission**: Submit button only works after successful payment

## Setup Instructions

### 1. Create a Paystack Account
1. Visit [https://paystack.com](https://paystack.com)
2. Click "Sign Up" and create your account
3. Complete the verification process

### 2. Get Your API Keys
1. Log in to your Paystack dashboard
2. Navigate to **Settings** → **API Keys & Webhooks**
3. You'll find two keys:
   - **Test Public Key** (pk_test_xxxxx) - for development
   - **Live Public Key** (pk_live_xxxxx) - for production

### 3. Configure Environment Variables
Create a `.env.local` file in the project root:

```bash
# Copy this into your .env.local file
NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY=pk_test_your_test_key_here
```

**Important**: 
- Never commit `.env.local` to version control
- Use test keys for development
- Use live keys only in production

### 4. No Additional Dependencies Required
The Paystack integration uses the official Paystack inline JavaScript, which is loaded directly from Paystack's CDN. No npm packages are required!

The script is automatically loaded when users reach the payment page:
```html
<Script src="https://js.paystack.co/v1/inline.js" strategy="lazyOnload" />
```

### 5. Test the Integration
1. Start the development server:
   ```bash
   npm run dev
   ```

2. Navigate to the application page: `/application`

3. Fill out the application form through all steps

4. On the payment page, click "Pay ₦25,000 with Paystack"

5. Use Paystack test cards:
   - **Successful Payment**: `4084 0840 8408 4081`
   - **Failed Payment**: `5060 6666 6666 6666`
   - CVV: Any 3 digits
   - Expiry: Any future date
   - PIN: `1234`

## How It Works

### Payment Flow
```
1. User reaches payment page
   ↓
2. User clicks "Pay with Paystack" button
   ↓
3. Paystack popup opens
   ↓
4. User selects payment method & pays
   ↓
5. Payment processed by Paystack
   ↓
6. Success callback triggered
   ↓
7. Transaction reference saved
   ↓
8. Payment status updated
   ↓
9. Submit button enabled
   ↓
10. User can submit application
```

### Code Structure

#### Paystack Payment Handler (app/application/page.tsx)
The integration uses Paystack Popup (inline script) for a seamless payment experience:

```typescript
const handlePaystackPayment = () => {
  // Validate email
  if (!formData.email) {
    alert('Please fill in your email address before proceeding to payment');
    return;
  }

  // Initialize Paystack popup
  const handler = window.PaystackPop.setup({
    key: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY,
    email: formData.email,
    amount: 2500000, // ₦25,000 in kobo
    currency: 'NGN',
    ref: `ACE-${new Date().getTime()}`,
    
    // Success callback
    callback: function(response) {
      setFormData({ 
        ...formData, 
        paymentReference: response.reference,
        paymentMethod: 'Paystack'
      });
      setPaymentCompleted(true);
      alert('Payment successful! You can now submit your application.');
    },
    
    // Close callback
    onClose: function() {
      alert('Payment cancelled. Please complete payment to submit your application.');
    }
  });
  
  // Open payment popup
  handler.openIframe();
};
```

#### Payment Button
```tsx
<button 
  onClick={handlePaystackPayment}
  type="button"
  className="w-full px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg..."
>
  <CreditCard className="h-6 w-6 mr-3" />
  Pay ₦25,000 with Paystack
</button>
```

## Database Changes

The Prisma schema already includes payment fields:
- `paymentMethod`: Automatically set to "Paystack"
- `paymentReference`: Stores the Paystack transaction reference
- `paymentProof`: No longer required (verification is automatic)

## UI Components

### Before Payment
- Shows application fee (₦25,000)
- Lists available payment methods
- Displays Paystack payment button
- Email confirmation notice

### During Payment
- Paystack popup opens
- User selects payment method
- Secure payment processing

### After Successful Payment
- Green success banner with checkmark
- Transaction reference displayed
- Submit button becomes enabled
- Confirmation message

### Failed Payment
- User can retry payment
- No data is lost
- Submit button remains disabled

## Testing

### Test Mode
When using test keys (`pk_test_...`), you can:
- Use test cards (no real money charged)
- Simulate successful and failed payments
- Test the complete flow

### Test Cards
| Card Number | Result |
|------------|--------|
| 4084 0840 8408 4081 | Success |
| 5060 6666 6666 6666 | Fail |
| 4084 0840 8408 4084 | Success (requires OTP: 123456) |

### Test Bank Transfer
- Test bank account details will be provided
- No actual transfer needed in test mode

## Going Live

### Prerequisites
1. **Complete Paystack Verification**:
   - Submit business documents
   - Verify business information
   - Wait for approval (usually 24-48 hours)

2. **Switch to Live Keys**:
   ```bash
   # Update .env.local
   NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY=pk_live_your_live_key_here
   ```

3. **Update Application Fee** (if needed):
   ```typescript
   // In app/application/page.tsx
   amount: 2500000, // ₦25,000 in kobo (1 Naira = 100 kobo)
   ```

### Compliance
- Paystack handles PCI compliance
- No sensitive card data touches your server
- All transactions are encrypted

## Webhook Integration (Optional)

For additional security, you can set up webhooks to verify payments server-side.

### Setup
1. In Paystack Dashboard: **Settings** → **API Keys & Webhooks**
2. Add webhook URL: `https://yourdomain.com/api/webhooks/paystack`
3. Create webhook handler in your app

Example webhook route (`app/api/webhooks/paystack/route.ts`):
```typescript
import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = request.headers.get('x-paystack-signature');
  
  // Verify signature
  const hash = crypto
    .createHmac('sha512', process.env.PAYSTACK_SECRET_KEY!)
    .update(body)
    .digest('hex');
  
  if (hash === signature) {
    const event = JSON.parse(body);
    
    if (event.event === 'charge.success') {
      // Update application payment status
      // Send confirmation email
      // etc.
    }
  }
  
  return NextResponse.json({ received: true });
}
```

## Troubleshooting

### Payment Button Not Working
- Check if `NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY` is set
- Verify the public key is correct
- Check browser console for errors
- Ensure email field is filled

### Payment Successful but Button Still Disabled
- Check browser console for JavaScript errors
- Verify `handlePaystackSuccess` is being called
- Clear browser cache and reload

### "Payment Declined" Error
- In test mode: Use correct test cards
- In live mode: Contact Paystack support
- Check if card has sufficient funds
- Verify card is enabled for online transactions

## Support

### Paystack Support
- Email: support@paystack.com
- Documentation: https://paystack.com/docs
- Dashboard: https://dashboard.paystack.com

### Developer Resources
- API Reference: https://paystack.com/docs/api
- Test Cards: https://paystack.com/docs/payments/test-payments
- Integration Guide: https://paystack.com/docs/guides

## Security Best Practices

1. ✅ **Never** expose your secret key (sk_...)
2. ✅ **Always** use HTTPS in production
3. ✅ **Validate** payment on server-side using webhooks
4. ✅ **Store** only transaction references, not card details
5. ✅ **Use** environment variables for API keys
6. ✅ **Test** thoroughly before going live

## Cost

Paystack charges:
- **Domestic cards**: 1.5% + ₦100 per transaction
- **International cards**: 3.9% + ₦100 per transaction
- No setup fees
- No monthly fees

For ₦25,000 application fee:
- Your fee: ₦25,000
- Paystack charge: ~₦475
- Net received: ~₦24,525

## Conclusion

The Paystack integration provides:
- ✅ Secure payment processing
- ✅ Multiple payment methods
- ✅ Instant verification
- ✅ Better user experience
- ✅ Reduced manual work
- ✅ Professional payment flow

For any issues or questions, refer to the Paystack documentation or contact their support team.

