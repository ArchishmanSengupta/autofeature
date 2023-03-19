import { useState } from 'react';
export default function Home() {
  const [users, setUsers] = useState(5.5);
  const [effort, setEffort] = useState(5.5);
  const [user_value, setUserValue] = useState(5.5);
  const [feature_value, setFeatureValue] = useState(5.5);
  const [negative_impact, setNegativeImpact] = useState(5.5);
  const [operational_complexity, setOperationalComplexity] = useState(5.5);

  const calculateResult = () => {
    const params = [
      { weight: 0.10, value: users, negative: false, name: 'p-users' },
      { weight: 0.15, value: effort, negative: true, name: 'p-effort' },
      { weight: 0.20, value: user_value, negative: false, name: 'p-user-value'},
      { weight: 0.20, value: feature_value, negative: false, name: 'p-feature-value'},
      { weight: 0.20, value: negative_impact, negative: true, name: 'p-negative-impact'},
      { weight: 0.15, value: operational_complexity, negative: true, name: 'p-operational-complexity'}
    ];
    let score = 0;
    let weightSum = 0;

    params.forEach(param => {
      const weightedValue = param.value * param.weight;
      score += param.negative ? (10 - param.value) * param.weight : weightedValue;
      weightSum += param.weight;
    });

    const percentage = ((score / weightSum) * 10).toFixed(0);
    let shouldBuild = "No Data Provided";

    if (percentage < 46) {
      shouldBuild = "Don't build 🙅‍♂️";
    } else if (percentage >= 46 && percentage < 50) {
      shouldBuild = "No, but it is a close call because the score is just below the threshold for building.";
    } else if (percentage === 50) {
      shouldBuild = "50-50. Go with the gut.";
    } else if (percentage > 50 && percentage <= 54) {
      shouldBuild = "Yes, but it is a close call because the score is just above the threshold for building.";
    } else if (percentage > 54) {
      shouldBuild = "Build 🥳🛠";
    }


    document.querySelector('.answer').classList.remove('hide');
    document.querySelector('.bool').innerHTML = shouldBuild;
    document.querySelector('.percent').innerHTML = `${percentage}%`;
  };

  const handleUsersChange = e => setUsers(parseFloat(e.target.value));
  const handleEffortChange = e => setEffort(parseFloat(e.target.value));
  const handleUserValueChange = e => setUserValue(parseFloat(e.target.value));
  const handleFeatureValueChange = e => setFeatureValue(parseFloat(e.target.value));
  const handleNegativeImpactChange = e => setNegativeImpact(parseFloat(e.target.value));
  const handleOperationalComplexityChange = e => setOperationalComplexity(parseFloat(e.target.value));
  return (
    <div className="container">
      <img src="../logo.jpg" alt="Logo" className="logo" />
      <h1 className="title">Decide Whether to <span className='text'>Build</span> a Software Feature or <span className='text'>Not</span></h1>
      <p>Software features are hard. This Algorithm-powered website helps you decide </p>
      <section className="box">
        <p className="help">1: Low, 10: High</p>
        <form className="form">
          <fieldset className="p-users">
            <span className="value">{users}</span>
            <label>What is the likelihood that a proportion of users, ranging from 1 (a small proportion) to 10 (all users), will use the feature?</label>
            <br></br>
            <input type="range" min="1" max="10" step="0.5" value={users} onChange={handleUsersChange} />
            <br></br>
          </fieldset>
          <fieldset className="p-effort">
            <span className="value">{effort}</span>
            <label>What is the time, technical effort, and cost to build the feature?</label>
            <br></br>
            <input type="range" min="1" max="10" step="0.5" value={effort} onChange={handleEffortChange} />
            <br></br>
          </fieldset>
          <fieldset className="p-user-value">
            <span className="value">{user_value}</span>
            <label>How important are the target users to the existing product?</label>
            <br></br>
            <input type="range" min="1" max="10" step="0.5" value={user_value} onChange={handleUserValueChange} />
            <br></br>
          </fieldset>
          <fieldset className="p-operation-complexity">
            <span className="value">{operational_complexity}</span>
            <label>What is the operational / business complexity of the feature?</label>
            <br></br>
            <input type="range" min="1" max="10" step="0.5" value={operational_complexity} onChange={handleOperationalComplexityChange} />
            <br></br>
          </fieldset>
          <fieldset className="p-feature-value">
            <span className="value">{feature_value}</span>
            <label>How valuable is the feature to the target users, truly?</label>
            <br></br>
            <input type="range" min="1" max="10" step="0.5" value={feature_value} onChange={handleFeatureValueChange} />
            <br></br>
          </fieldset>
          <fieldset className="p-negative-impact">
            <span className="value">{negative_impact}</span>
            <label>How much potential technical risk can the feature bring to the rest of the product?</label>
            <br></br>
            <input type="range" min="1" max="10" step="0.5" value={negative_impact} onChange={handleNegativeImpactChange} />
            <br></br>
          </fieldset>
        </form>
        <div className="text-center">
          <button id="answer-visibility-toggle" onClick={calculateResult}>
            Calculate
          </button>
        </div>
        <h1 className="answer hide">
          <span>
            <span className="bool"></span> (<span className="percent"></span>)
          </span>
        </h1>
      </section>
      <a href="https://twitter.com/archiexzzz">
      <h2>@archiexzzz</h2>
      </a>
    </div>
    )
}