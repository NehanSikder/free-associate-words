import './App.css';
import WordDisplay from './components/WordDisplay';

function App() {
  return (
    <div class="flex flex-col min-h-screen">
      {/* Header */}
      <header class="p-2">
        <h1 class="text-center text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">Free Associate Words</h1>
      </header>
      {/* Main Body */}
      <div class="flex flex-1 bg-slate-200">
        {/* left side bar */}
        <aside class="w-64 p-4">
        </aside>
        {/* Main Content */}
        <main class="flex-1 p-4 text-center">
          <WordDisplay/>
        </main>
        {/* Right sidebar */}
        <aside class="w-64 p-4">  
        </aside>

      </div>

      {/* Footer */}
      <footer class="p-4">
        <h1 class="text-center"></h1>
      </footer>
    </div>
  )
}

export default App;
