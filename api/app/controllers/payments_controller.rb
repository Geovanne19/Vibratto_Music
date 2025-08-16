# app/controllers/payments_controller.rb
class PaymentsController < ActionController::API
  require 'stripe'

  def create
    Stripe.api_key = ENV['STRIPE_SECRET_KEY']

    # Converte o valor para centavos
    amount = (params[:amount].to_f * 100).to_i

    payment_intent = Stripe::PaymentIntent.create(
      amount: amount,
      currency: 'brl',
      automatic_payment_methods: { enabled: true }
    )

    render json: { clientSecret: payment_intent.client_secret }
  end
end
