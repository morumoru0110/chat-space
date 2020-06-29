class Message < ApplicationRecord
  belongs_to :group
  belongs_to :user

  validates :content, presence: true, unless: :imaage?

  mount_uploader :image, ImageUploader
end
