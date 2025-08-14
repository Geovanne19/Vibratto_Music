class CreateCategorias < ActiveRecord::Migration[7.1]
  def change
    create_table :categorias do |t|
      t.string :nome
      t.string :img

      t.timestamps
    end
  end
end
