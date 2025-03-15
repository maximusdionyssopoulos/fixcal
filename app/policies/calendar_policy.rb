class CalendarPolicy < ApplicationPolicy
  class Scope < ApplicationPolicy::Scope
    # NOTE: Be explicit about which records you allow access to!
    def resolve
      # scope.where(user: user).or(scope.where(public: true))
      if user.nil?
        scope.where(public: true)
      else
        scope.where(user: user).or(scope.where(public: true))
      end
    end
  end
  def show?
    record.public || user == record.user
  end

  def create?
    user.present?
  end

  def update?
    user == record.user
  end

  def edit?
    update?
  end

  def destroy?
    user == record.user
  end
end
