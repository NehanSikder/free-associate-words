import './App.css';
import WordDisplay from './components/WordDisplay';

function App() {
  return (
    <div class="flex flex-col min-h-screen w-screen">
      {/* Header */}
      <header class="p-2">
        <h1 class="text-center text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">Free Associate Words</h1>
      </header>
      {/* Main Body */}
      <div class="flex flex-1 bg-slate-200">
        {/* left side bar */}
        <aside class="p-4 w-1/12">
        </aside>
        {/* Main Content */}
        <main class="flex-1 p-4 text-center w-10/12">
          <WordDisplay/>
        </main>
        {/* Right sidebar */}
        <aside class="p-4 w-1/12">  
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
