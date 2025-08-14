class AddDescricaoToProdutos < ActiveRecord::Migration[7.1]
  def change
    add_column :produtos, :descricao, :string
  end
end
