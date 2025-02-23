# frozen_string_literal: true

class InertiaExampleController < ApplicationController
  def index
    render inertia: "InertiaExample", props: {
      name: params.fetch(:name, "Bodie")
    }
  end
end
