import { Users, UserCheck, User, UserCircle } from "lucide-react";

export const StatsCards = ({ stats }) => {
  const cards = [
    {
      title: "Total Strength",
      value: stats.totalStrength,
      icon: Users,
      gradient: "bg-gradient-primary",
      delay: "0ms",
    },
    {
      title: "Total Present",
      value: `${stats.totalPresent} / ${stats.totalStrength}`,
      icon: UserCheck,
      gradient: "bg-gradient-accent",
      delay: "100ms",
    },
    {
      title: "Boys Present",
      value: `${stats.boysPresent} / ${stats.boysTotal}`,
      icon: User,
      gradient: "from-blue-500 to-blue-700",
      isGradientClass: true,
      delay: "200ms",
    },
    {
      title: "Girls Present",
      value: `${stats.girlsPresent} / ${stats.girlsTotal}`,
      icon: UserCircle,
      gradient: "from-pink-500 to-pink-700",
      isGradientClass: true,
      delay: "300ms",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card) => (
        <div
          key={card.title}
          className="animate-slide-up"
          style={{ animationDelay: card.delay }}
        >
          <div className="relative overflow-hidden rounded-xl bg-white border p-6 shadow hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            {/* Background Gradient */}
            <div className="absolute inset-0 opacity-5">
              <div
                className={`w-full h-full ${
                  card.isGradientClass
                    ? `bg-gradient-to-br ${card.gradient}`
                    : card.gradient
                }`}
              />
            </div>

            {/* Content */}
            <div className="relative flex items-center gap-4">
              <div
                className={`flex items-center justify-center w-12 h-12 rounded-lg ${
                  card.isGradientClass
                    ? `bg-gradient-to-br ${card.gradient}`
                    : card.gradient
                }`}
              >
                <card.icon className="w-6 h-6 text-white" />
              </div>

              <div>
                <p className="text-sm font-medium text-gray-500">
                  {card.title}
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {card.value}
                </p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
