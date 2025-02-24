# frozen_string_literal: true

class InertiaExampleController < ApplicationController
  def index
    render inertia: "InertiaExample", props: {
      name: params.fetch(:name, "Bodie & Marlo"),
      login_url: user_google_oauth2_omniauth_authorize_path,
      token: form_authenticity_token
    }
  end
end
