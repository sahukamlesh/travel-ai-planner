import React, { useState } from "react";

function App() {
  const [plan, setPlan] = useState({
    destination: "",
    date: "",
    activities: "",
  });

  const handleChange = (e) => {
    setPlan({ ...plan, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/ask", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: `Plan a trip to ${plan.destination} on ${plan.date} with these activities: ${plan.activities}`,
        }),
      });
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="App">
      <h1>Travel Planner</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Destination:
          <input type="text" name="destination" onChange={handleChange} />
        </label>
        <label>
          Date:
          <input type="date" name="date" onChange={handleChange} />
        </label>
        <label>
          Activities:
          <textarea name="activities" onChange={handleChange} />
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default App;
