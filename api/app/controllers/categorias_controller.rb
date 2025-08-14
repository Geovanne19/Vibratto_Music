class CategoriasController < ApplicationController
  before_action :set_categoria, only: %i[ show update destroy ]

  # GET /categorias
  def index
    @categorias = Categoria.all

    render json: @categorias
  end

  # GET /categorias/1
  def show
    render json: @categoria
  end

  # POST /categorias
  def create
    @categoria = Categoria.new(categoria_params)

    if @categoria.save
      render json: @categoria, status: :created, location: @categoria
    else
      render json: @categoria.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /categorias/1
  def update
    if @categoria.update(categoria_params)
      render json: @categoria
    else
      render json: @categoria.errors, status: :unprocessable_entity
    end
  end

  # DELETE /categorias/1
  def destroy
    @categoria.destroy!
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_categoria
      @categoria = Categoria.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def categoria_params
      params.require(:categoria).permit(:nome, :img)
    end
end
