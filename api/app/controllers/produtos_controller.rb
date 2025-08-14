class ProdutosController < ApplicationController
  before_action :set_produto, only: %i[ show update destroy ]

  # GET /produtos
  def index
    if params[:categoria_nome]
      categoria = Categoria.where('LOWER(nome) = ?', params[:categoria_nome].downcase).first
      if categoria
        render json: categoria.produtos
      else
        render json: [], status: :not_found
      end

    elsif params[:categoria_id]
      render json: Produto.where(categoria_id: params[:categoria_id])

    else
      render json: Produto.all
    end
  end




  # GET /produtos/1
  def show
    render json: @produto
  end

  # POST /produtos
  def create
    @produto = Produto.new(produto_params)

    if @produto.save
      render json: @produto, status: :created, location: @produto
    else
      render json: @produto.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /produtos/1
  def update
    if @produto.update(produto_params)
      render json: @produto
    else
      render json: @produto.errors, status: :unprocessable_entity
    end
  end

  # DELETE /produtos/1
  def destroy
    @produto.destroy!
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_produto
      @produto = Produto.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def produto_params
      params.require(:produto).permit(:nome, :preco, :img, :categoria_id)
    end
end
