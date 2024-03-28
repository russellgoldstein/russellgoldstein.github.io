import React from 'react';

const OutcomeSliders = ({ outcomePercents, setOutcomePercents }) => {
  // Function to handle slider changes
  const handleChange = (hitType, hitQuality, outcome, value) => {
    setOutcomePercents((prev) => ({
      ...prev,
      [hitType]: {
        ...prev[hitType],
        [hitQuality]: {
          ...prev[hitType][hitQuality],
          [outcome]: Number(value),
        },
      },
    }));
  };

  return (
    <div className='flex flex-wrap justify-around w-full'>
      {Object.entries(outcomePercents).map(([hitType, strengths]) => (
        <div key={hitType} className='p-4 m-2 border border-gray-300 rounded shadow-lg' style={{ minWidth: '250px' }}>
          <h3 className='text-lg font-bold'>{hitType.charAt(0).toUpperCase() + hitType.slice(1)}</h3>
          {Object.entries(strengths).map(([strength, outcomes], index) => {
            // Calculate the total percentage for the current strength
            const totalPercentage = Object.values(outcomes).reduce((sum, value) => sum + value, 0);

            return (
              <div key={strength} className={`mt-${index > 0 ? 4 : 2}`}>
                <h4 className='font-semibold'>{`${
                  strength.charAt(0).toUpperCase() + strength.slice(1)
                } - Total: ${totalPercentage}%`}</h4>
                {Object.entries(outcomes).map(([outcome, value]) => (
                  <div key={`${hitType}-${strength}-${outcome}`} className='mt-2'>
                    <label className='flex items-center justify-between'>
                      <span className='mr-2'>{`${outcome.charAt(0).toUpperCase() + outcome.slice(1)}: `}</span>
                      <input
                        type='range'
                        min='0'
                        max='100'
                        value={value}
                        onChange={(e) => handleChange(hitType, strength, outcome, e.target.value)}
                        className='mx-2'
                      />
                      <span>{value}%</span>
                    </label>
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default OutcomeSliders;
