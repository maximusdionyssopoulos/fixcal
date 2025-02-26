class Calendar < ApplicationRecord
  belongs_to :user
  has_one_attached :ics_file
end
