import './App.css';
import WordDisplay from './components/WordDisplay';

function App() {
  return (
    <div class="flex flex-col min-h-screen">
      {/* Header */}
      <header class="bg-blue-500 text-white p-4">
        <h1 class="text-center">Header</h1>
      </header>
      {/* Main Body */}
      <div class="flex flex-1">
        {/* left side bar */}
        <aside class="w-64 p-4">
        </aside>
        {/* Main Content */}
        <main class="flex-1 bg-white p-4 text-center">
          <WordDisplay/>
        </main>
        {/* Right sidebar */}
        <aside class="w-64 p-4">  
        </aside>

      </div>

      {/* Footer */}
      <footer class="bg-blue-500 text-white p-4">
        <h1 class="text-center">Footer</h1>
      </footer>
    </div>
  )
}

export default App;
