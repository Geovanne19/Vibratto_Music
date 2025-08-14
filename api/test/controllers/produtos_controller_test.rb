require "test_helper"

class ProdutosControllerTest < ActionDispatch::IntegrationTest
  setup do
    @produto = produtos(:one)
  end

  test "should get index" do
    get produtos_url, as: :json
    assert_response :success
  end

  test "should create produto" do
    assert_difference("Produto.count") do
      post produtos_url, params: { produto: { categoria_id: @produto.categoria_id, img: @produto.img, nome: @produto.nome, preço: @produto.preço } }, as: :json
    end

    assert_response :created
  end

  test "should show produto" do
    get produto_url(@produto), as: :json
    assert_response :success
  end

  test "should update produto" do
    patch produto_url(@produto), params: { produto: { categoria_id: @produto.categoria_id, img: @produto.img, nome: @produto.nome, preço: @produto.preço } }, as: :json
    assert_response :success
  end

  test "should destroy produto" do
    assert_difference("Produto.count", -1) do
      delete produto_url(@produto), as: :json
    end

    assert_response :no_content
  end
end
