require "test_helper"

class CartItemsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @cart_item = cart_items(:one)
  end

  test "should get index" do
    get cart_items_url, as: :json
    assert_response :success
  end

  test "should create cart_item" do
    assert_difference("CartItem.count") do
      post cart_items_url, params: { cart_item: { produto_id: @cart_item.produto_id, quantidade: @cart_item.quantidade, user_id: @cart_item.user_id } }, as: :json
    end

    assert_response :created
  end

  test "should show cart_item" do
    get cart_item_url(@cart_item), as: :json
    assert_response :success
  end

  test "should update cart_item" do
    patch cart_item_url(@cart_item), params: { cart_item: { produto_id: @cart_item.produto_id, quantidade: @cart_item.quantidade, user_id: @cart_item.user_id } }, as: :json
    assert_response :success
  end

  test "should destroy cart_item" do
    assert_difference("CartItem.count", -1) do
      delete cart_item_url(@cart_item), as: :json
    end

    assert_response :no_content
  end
end
