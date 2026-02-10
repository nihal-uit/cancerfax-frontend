import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import CostCalculatorHero from '../components/CostCalculatorComponent/CostCalculatorHero';
import CalculatedCostSection from '../components/CostCalculatorComponent/CalculatedCostSection';
import CostCalculatorFaqSection from '../components/CostCalculatorComponent/CostCalculatorFaqSection';

const CostCalculatorPage = () => {
  return (
    <div className='page_wrapper'>
      <Header darkText={false} />
      <CostCalculatorHero />
      <CalculatedCostSection />
      <CostCalculatorFaqSection />
      <Footer />
    </div>
  );
};

export default CostCalculatorPage;