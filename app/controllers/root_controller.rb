class RootController < ApplicationController
  def index
    render inertia: "Root", props: {token: form_authenticity_token}
  end
end
