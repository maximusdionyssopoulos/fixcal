class CalendarPolicy < ApplicationPolicy
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
