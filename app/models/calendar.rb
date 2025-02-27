class Calendar < ApplicationRecord
  belongs_to :user
  has_one_attached :ics_file

  validates :url, presence: true

  def to_param
    public_id
  end
end
