import './style.css';

import Footer from './components/Footer';
import SearchBar from './components/SearchBar';
import SeasonSelector from './components/SeasonSelector';
import ShowDescription from './components/ShowDescription';
import Timeline from './components/Timeline';

export default function App() {
  return (
    <div className="App">
      <SearchBar />
      <ShowDescription />
      <SeasonSelector />
      <Timeline />
      <Footer />
    </div>
  );
}