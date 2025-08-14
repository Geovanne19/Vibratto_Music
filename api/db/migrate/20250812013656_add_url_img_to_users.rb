class AddUrlImgToUsers < ActiveRecord::Migration[7.1]
  def change
    add_column :users, :url_img, :string
  end
end
