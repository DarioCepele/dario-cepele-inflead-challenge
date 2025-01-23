import { useState, useEffect } from "react";
import "./App.css";
import Card from "./components/card";
import axios from "axios";
import { useCookies } from "react-cookie";

function App() {
  const [cookies, setCookie] = useCookies(["selectedCards"]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleSaveCard = (cardData) => {
    const existingCards = cookies.selectedCards || [];
    const isCardExists = existingCards.some((card) => card.id === cardData.id);

    if (!isCardExists) {
      const updatedCards = [...existingCards, cardData];
      setCookie("selectedCards", updatedCards, { path: "/" });
    }
  };

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await axios.get(import.meta.env.VITE_RANDOM_USER_API_KEY);
      setUsers(response.data);
      setError(null);
    } catch (err) {
      if (err.response.status === 429) {
        await new Promise((resolve) => setTimeout(resolve, 3000));
      } else {
        setError("Errore nel caricamento: " + err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  if (loading) {
    return (
      <div className='min-h-screen bg-gray-100 p-8 flex items-center justify-center'>
        <div className='text-xl text-gray-600'>Caricamento utenti...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className='min-h-screen bg-gray-100 p-8 flex items-center justify-center'>
        <div className='text-xl text-red-600'>{error}</div>
      </div>
    );
  }

  const savedCards = cookies.selectedCards || [];

  return (
    <div className='min-h-screen bg-gray-100 p-8'>
      <div className='max-w-7xl mx-auto'>
        <h1 className='text-3xl font-bold text-gray-800 mb-8 font-poppins'>Dashboard</h1>

        {savedCards.length > 0 && (
          <div>
            <h2 className='text-2xl font-semibold mb-4'>Saved card</h2>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8'>
              {savedCards.map((savedCard) => (
                <Card key={savedCard.id} {...savedCard} />
              ))}
            </div>
          </div>
        )}

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {users.map((user) => (
            <Card
              key={user.id}
              id={user.id}
              name={user.first_name}
              surname={user.last_name}
              img={user.avatar}
              plan={user.subscription.plan}
              status={user.subscription.status}
              email={user.email}
              employment={user.employment.title}
              gender={user.gender}
              username={user.username}
              number={user.phone_number}
              birthday={user.date_of_birth}
              city={user.address.city}
              state={user.address.state}
              term={user.subscription.term}
              onSave={() =>
                handleSaveCard({
                  id: user.id,
                  name: user.first_name,
                  surname: user.last_name,
                  img: user.avatar,
                  plan: user.subscription.plan,
                  status: user.subscription.status,
                  email: user.email,
                  employment: user.employment.title,
                  gender: user.gender,
                  username: user.username,
                  number: user.phone_number,
                  birthday: user.date_of_birth,
                  city: user.address.city,
                  state: user.address.state,
                  term: user.subscription.term,
                })
              }
            />
          ))}
        </div>
        <div className='text-center mt-8'>
          <button
            onClick={fetchUsers}
            disabled={loading}
            className='bg-zinc-500 text-white font-poppins text-xl px-6 py-3 rounded-lg hover:bg-zinc-600 disabled:opacity-50'
          >
            {loading ? "Loading..." : "Search"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
