import { ExpandableCardsHero, songs } from '../../features/expandable-cards-hero';

export default function ExpandableCardsHeroDemo() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Expandable Cards Hero
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Click on any song card to see a smooth hero animation that expands the card
            with additional details and information.
          </p>
        </div>

        <ExpandableCardsHero songs={songs} />
      </div>
    </div>
  );
}
