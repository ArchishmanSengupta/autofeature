import { useState } from 'react';
import '../styles/styles.css';
export default function Home() {
  const [users, setUsers] = useState(5.5);
  const [effort, setEffort] = useState(5.5);

  const calculateResult = () => {
    const params = [
      { weight: 0.10, value: users, negative: false, name: 'p-users' },
      { weight: 0.20, value: effort, negative: true, name: 'p-effort' },
    ];
    let score = 0;
    let weightSum = 0;

    params.forEach(param => {
      const weightedValue = param.value * param.weight;
      score += param.negative ? (10 - param.value) * param.weight : weightedValue;
      weightSum += param.weight;
    });

    const percentage = ((score / weightSum) * 10).toFixed(0);
    const shouldBuild = percentage >= 50;

    document.querySelector('.answer').classList.remove('hide');
    document.querySelector('.bool').innerHTML = shouldBuild ? 'Build' : "Don't build";
    document.querySelector('.percent').innerHTML = `${percentage}%`;
  };

  const handleUsersChange = e => setUsers(parseFloat(e.target.value));
  const handleEffortChange = e => setEffort(parseFloat(e.target.value));

  return (
    <div className="container">
      <section className="box">
        <p className="help">1: Low, 10: High</p>
        <h1 className="title">Don't build (or build) that feature</h1>
        <p>A simple, opinionated tool for helping decide whether a software feature is worth building.</p>
        <br />
        <form className="form">
          <fieldset className="p-users">
            <span className="value">{users}</span>
            <label>What proportion of users (1=a small proportion, 10=all users) are likely to use the feature?</label>
            <input type="range" min="1" max="10" step="0.5" value={users} onChange={handleUsersChange} />
          </fieldset>
          <fieldset className="p-effort">
            <span className="value">{effort}</span>
            <label>What is the time, technical effort, and cost to build the feature?</label>
            <input type="range" min="1" max="10" step="0.5" value={effort} onChange={handleEffortChange} />
          </fieldset>
        </form>
        <div className="text-center">
          <button id="answer-visibility-toggle" onClick={calculateResult}>
            Show Answer
          </button>
        </div>
        <h1 className="answer hide">
          <span>
            <span className="bool"></span> (<span className="percent"></span>)
          </span>
        </h1>
      </section>
      <noscript>
        <h1>This page requires Javascript to function.</h1>
      </noscript>
      <section>
        <p>
          Technical decisions are often about being as less-wrong as possible than being right. Decision parameters
          themselves are dependent on even more parameters, such as the business environment, expertise, team and user
          culture, cost ... There is no one-size-fits all framework for making technical decisions, especially when it
          comes to adding a new feature to a product as they often (rightly) tend to be subjective bets than scientific
          conclusions.{' '}
        </p>
        </section>
    </div>
    )
}