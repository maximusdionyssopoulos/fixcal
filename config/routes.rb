Rails.application.routes.draw do
  resources :calendars, except: [ :new ], param: :public_id do
    get :download, on: :member
  end

  get "/download", to: "root#download"

  devise_for :users, controllers: { omniauth_callbacks: "users/omniauth_callbacks" }
  as :user do
    get "auth", to: "users/sessions#new"
    delete "auth", to: "users/sessions#destroy"
  end

  # inertia "/" => "Root"
  root "root#index"
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check

  # Render dynamic PWA files from app/views/pwa/* (remember to link manifest in application.html.erb)
  # get "manifest" => "rails/pwa#manifest", as: :pwa_manifest
  # get "service-worker" => "rails/pwa#service_worker", as: :pwa_service_worker

  # Defines the root path route ("/")
  # root "posts#index"
end
