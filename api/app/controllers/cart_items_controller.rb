class CartItemsController < ApplicationController
  before_action :authenticate_user!

  # GET /cart_items
  def index
    cart_items = current_user.cart_items.includes(:produto)
    render json: cart_items.as_json(include: :produto)
  end

  # POST /cart_items
  def create
    cart_item = current_user.cart_items.find_or_initialize_by(produto_id: cart_item_params[:produto_id])

    quantidade = cart_item_params[:quantidade].to_i
    quantidade = 1 if quantidade < 1 # quantidade mínima de 1

    cart_item.quantidade ||= 0
    cart_item.quantidade += quantidade

    if cart_item.save
      render json: cart_item.as_json(include: :produto), status: :created
    else
      render json: { errors: cart_item.errors.full_messages }, status: :unprocessable_entity
    end
  end

  # PATCH /cart_items/:id
  def update
    cart_item = current_user.cart_items.find_by(id: params[:id])
    return render json: { error: "Item do carrinho não encontrado" }, status: :not_found unless cart_item

    new_quantity = params[:quantidade].to_i

    # Não permite quantidade menor que 1
    if new_quantity < 1
      return render json: { error: "Quantidade mínima é 1" }, status: :unprocessable_entity
    end

    if cart_item.update(quantidade: new_quantity)
      render json: cart_item.as_json(include: :produto)
    else
      render json: { errors: cart_item.errors.full_messages }, status: :unprocessable_entity
    end
  end

  # DELETE /cart_items/:id
  def destroy
    cart_item = current_user.cart_items.find_by(id: params[:id])
    return render json: { error: "Item do carrinho não encontrado" }, status: :not_found unless cart_item

    cart_item.destroy
    head :no_content
  end

  private

  def cart_item_params
    params.require(:cart_item).permit(:produto_id, :quantidade)
  end
end
