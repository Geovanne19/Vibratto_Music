class CartItem < ApplicationRecord
  belongs_to :user
  belongs_to :produto

  validates :quantidade, numericality: { greater_than: 0 }
end
