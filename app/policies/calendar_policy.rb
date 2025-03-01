class CalendarPolicy < ApplicationPolicy
  def show?
    user == record.user
  end

  def create?
    user.present?
  end

  def update?
    user == record.user
  end

  def downlaod
    user == record.user
  end

  def edit
    update?
  end

  def destroy
    user == record.user
  end

  class Scope < ApplicationPolicy::Scope
    # NOTE: Be explicit about which records you allow access to!
    def resolve
      scope.where(user: user)
    end
  end
end
