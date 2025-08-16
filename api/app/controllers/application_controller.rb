class ApplicationController < ActionController::API

  before_action :set_default_format

  private

  def set_default_format
    request.format = :json
  end

  # Autenticação via JWT
  def authenticate_user!
    header = request.headers['Authorization']
    if header.present?
      token = header.split(' ').last
      begin
        decoded = JWT.decode(token, Rails.application.credentials.secret_key_base, true, algorithm: 'HS256')
        @current_user = User.find(decoded[0]["user_id"])
      rescue JWT::DecodeError, ActiveRecord::RecordNotFound
        render json: { error: "Token inválido" }, status: :unauthorized
      end
    else
      render json: { error: "Token não enviado" }, status: :unauthorized
    end
  end

  def current_user
    @current_user
  end
end
