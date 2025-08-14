class Produto < ApplicationRecord
  belongs_to :categoria

  def as_json(options = {})
    super(options).merge({
      preco: preco.round(2)  # força o preço com 2 casas decimais, como float normal
    })
  end
end
