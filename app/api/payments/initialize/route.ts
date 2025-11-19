import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, amount } = body;

    if (!email) {
      return NextResponse.json(
        { success: false, message: 'Email is required' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, message: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Amount in kobo (25000 Naira = 2500000 kobo)
    const amountInKobo = amount || 2500000;

    // Get Paystack secret key from environment variables
    const paystackSecretKey = process.env.PAYSTACK_SECRET_KEY;

    if (!paystackSecretKey) {
      console.error('PAYSTACK_SECRET_KEY is not set in environment variables');
      return NextResponse.json(
        { 
          success: false, 
          message: 'Payment service is not configured. Please set PAYSTACK_SECRET_KEY in your environment variables.',
          error: 'MISSING_API_KEY'
        },
        { status: 500 }
      );
    }

    // Validate key format
    if (!paystackSecretKey.startsWith('sk_test_') && !paystackSecretKey.startsWith('sk_live_')) {
      console.error('Invalid Paystack secret key format. Key should start with sk_test_ or sk_live_');
      return NextResponse.json(
        { 
          success: false, 
          message: 'Invalid API key format. Please check your PAYSTACK_SECRET_KEY.',
          error: 'INVALID_KEY_FORMAT'
        },
        { status: 500 }
      );
    }

    const callbackUrl = `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/application?payment_callback=true`;
    
    const requestBody = {
      email,
      amount: amountInKobo,
      currency: 'NGN',
      callback_url: callbackUrl,
      metadata: {
        custom_fields: [
          {
            display_name: 'Application Fee',
            variable_name: 'application_fee',
            value: 'Application Processing Fee'
          }
        ]
      }
    };

    console.log('Initializing Paystack transaction:', {
      email,
      amount: amountInKobo,
      callbackUrl,
      keyPrefix: paystackSecretKey.substring(0, 8) + '...'
    });

    // Initialize Paystack transaction
    const response = await fetch('https://api.paystack.co/transaction/initialize', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${paystackSecretKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });

    const data = await response.json();

    console.log('Paystack API Response:', {
      status: response.status,
      statusText: response.statusText,
      dataStatus: data.status,
      message: data.message
    });

    if (!response.ok) {
      console.error('Paystack API Error Details:', {
        status: response.status,
        statusText: response.statusText,
        error: data
      });
      
      // Provide more specific error messages
      let errorMessage = data.message || 'Failed to initialize payment';
      
      if (response.status === 401) {
        errorMessage = 'Invalid API key. Please check your PAYSTACK_SECRET_KEY in environment variables.';
      } else if (response.status === 400) {
        errorMessage = data.message || 'Invalid request. Please check your payment details.';
      }
      
      return NextResponse.json(
        { 
          success: false, 
          message: errorMessage,
          error: data.message,
          status: response.status
        },
        { status: response.status }
      );
    }

    if (data.status && data.data && data.data.authorization_url) {
      return NextResponse.json({
        success: true,
        authorization_url: data.data.authorization_url,
        access_code: data.data.access_code,
        reference: data.data.reference,
      });
    } else {
      console.error('Invalid Paystack response structure:', data);
      return NextResponse.json(
        { 
          success: false, 
          message: 'Invalid response from payment service',
          error: 'INVALID_RESPONSE',
          response: data
        },
        { status: 500 }
      );
    }
  } catch (error: any) {
    console.error('Error initializing payment:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: error.message || 'Failed to initialize payment',
        error: 'EXCEPTION',
        details: error.toString()
      },
      { status: 500 }
    );
  }
}

