require "test_helper"

class CategoriasControllerTest < ActionDispatch::IntegrationTest
  setup do
    @categoria = categorias(:one)
  end

  test "should get index" do
    get categorias_url, as: :json
    assert_response :success
  end

  test "should create categoria" do
    assert_difference("Categoria.count") do
      post categorias_url, params: { categoria: { img: @categoria.img, nome: @categoria.nome } }, as: :json
    end

    assert_response :created
  end

  test "should show categoria" do
    get categoria_url(@categoria), as: :json
    assert_response :success
  end

  test "should update categoria" do
    patch categoria_url(@categoria), params: { categoria: { img: @categoria.img, nome: @categoria.nome } }, as: :json
    assert_response :success
  end

  test "should destroy categoria" do
    assert_difference("Categoria.count", -1) do
      delete categoria_url(@categoria), as: :json
    end

    assert_response :no_content
  end
end
