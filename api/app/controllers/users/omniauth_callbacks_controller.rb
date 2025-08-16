class Users::OmniauthCallbacksController < Devise::OmniauthCallbacksController
  def google_oauth2
    @user = User.from_omniauth(request.env['omniauth.auth'])
    puts "EXECUTANDO O CALLBACK DO GOOGLE!"

    if @user.persisted?
      # 1. Definir o payload (informações do usuário a serem incluídas no token)
      # Adicionamos 'exp' (expiration) para que o token expire após um tempo
      payload = { user_id: @user.id, exp: 24.hours.from_now.to_i }
      
      # 2. Obter a chave secreta da aplicação
      # Usar Rails.application.credentials.secret_key_base é a forma mais segura
      secret_key = Rails.application.credentials.secret_key_base

      # 3. Gerar o token JWT usando o payload e a chave secreta
      token = JWT.encode(payload, secret_key, 'HS256')
      
      # URL do seu frontend, por exemplo, http://localhost:3000
      frontend_url = "http://localhost:5173/home"

      # 4. Redirecionar para o frontend com o token na URL
      redirect_to "#{frontend_url}?token=#{token}&nome=#{CGI.escape(@user.nome)}&email=#{CGI.escape(@user.email)}&url_img=#{CGI.escape(@user.url_img)}", allow_other_host: true
    else
      error_message = @user.errors.full_messages.join("\n")
      redirect_to "http://localhost:3000/login?error=#{CGI.escape(error_message)}", allow_other_host: true
    end
  end
end