class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  # devise :database_authenticatable, :registerable,
  #        :recoverable, :rememberable, :validatable
  devise :omniauthable, omniauth_providers: [ :google_oauth2 ]

  has_many :calendar

  def self.from_omniauth(access_token)
    data = access_token.info
    user = User.where(email: data["email"]).first
    unless user
      user = User.create(
        full_name: data["name"],
        email: data["email"],
        provider: access_token["provider"],
        uid: access_token["uid"]
      )
    end
  end
end
