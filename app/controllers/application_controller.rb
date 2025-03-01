class ApplicationController < ActionController::Base
  include Pundit::Authorization

  # Only allow modern browsers supporting webp images, web push, badges, import maps, CSS nesting, and CSS :has.
  allow_browser versions: :modern

  inertia_share signed_in: -> { user_signed_in? }
  inertia_share flash: -> { flash.to_hash }

  rescue_from StandardError, with: :inertia_error_page
  rescue_from Pundit::NotAuthorizedError, with: :user_not_authorized
  private
    # when the user_not_authorised error is called we redirect to the Error page with status 403 - forbidden
    def user_not_authorized(exception)
      raise exception if Rails.env.local?

      status = 403

      render inertia: "Error", props: { status: status }, status: status
    end

    def inertia_error_page(exception)
        raise exception if Rails.env.local?

        status = ActionDispatch::ExceptionWrapper.new(nil, exception).status_code

        render inertia: "Error", props: { status: }, status: status
    end
end
