class RenamePrecoColumn < ActiveRecord::Migration[7.1]
  def change
    rename_column :produtos, :preço, :preco 
  end
end
