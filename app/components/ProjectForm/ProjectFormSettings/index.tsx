import { useState } from 'react';
import styles from './index.module.scss';
import { Box, Slider } from '@mui/material';

const defaultSettings = {
  positive: 80,
  neutral: 10,
  negative: 5,
  questions: 5,
};

const ProjectFormSettings = () => {
  const [positive, setPositive] = useState(defaultSettings.positive);
  const [neutral, setNeutral] = useState(defaultSettings.neutral);
  const [negative, setNegative] = useState(defaultSettings.negative);
  const [questions, setQuestions] = useState(defaultSettings.questions);

  const handlePositive = (pos: number) => {
    const max = 100 - (neutral + negative + questions);
    if (pos <= max) setPositive(pos);
  };
  const handleNeutral = (neu: number) => {
    const max = 100 - (positive + negative + questions);
    if (neu <= max) setNeutral(neu);
  };
  const handleNegative = (neg: number) => {
    const max = 100 - (neutral + positive + questions);
    if (neg <= max) setNegative(neg);
  };
  const handleQuestions = (que: number) => {
    const max = 100 - (neutral + negative + positive);
    if (que <= max) setQuestions(que);
  };

  return (
    <div className={styles.wrapper}>
      {/* positive */}
      <div className={styles.controlWrapper}>
        <div className={styles.controlHeader}>
          <h3 className={styles.positiveColor}>Positive</h3>
          <span>{positive}%</span>
        </div>
        <Box width="100%">
          <Slider
            tabIndex={3}
            name="positive"
            size="small"
            defaultValue={positive}
            aria-label="positive"
            valueLabelDisplay="off"
            min={0}
            max={100}
            marks={[
              { value: 100 - (neutral + negative + questions), label: 'max' },
            ]}
            value={positive}
            onChange={(event: Event, value: number | number[]) =>
              handlePositive(value as number)
            }
          />
        </Box>
      </div>

      {/* neutral */}
      <div className={styles.controlWrapper}>
        <div className={styles.controlHeader}>
          <h3 className={styles.neutralColor}>Neutral</h3>
          <span>{neutral}%</span>
        </div>
        <Box width="100%">
          <Slider
            tabIndex={4}
            name="neutral"
            size="small"
            defaultValue={neutral}
            aria-label="neutral"
            valueLabelDisplay="off"
            min={0}
            max={100}
            marks={[
              { value: 100 - (positive + negative + questions), label: 'max' },
            ]}
            value={neutral}
            onChange={(event: Event, value: number | number[]) =>
              handleNeutral(value as number)
            }
          />
        </Box>
      </div>

      {/* negative */}
      <div className={styles.controlWrapper}>
        <div className={styles.controlHeader}>
          <h3 className={styles.negativeColor}>Negative</h3>
          <span>{negative}%</span>
        </div>
        <Box width="100%">
          <Slider
            tabIndex={5}
            name="negative"
            size="small"
            defaultValue={negative}
            aria-label="negative"
            valueLabelDisplay="off"
            min={0}
            max={100}
            marks={[
              { value: 100 - (neutral + positive + questions), label: 'max' },
            ]}
            value={negative}
            onChange={(event: Event, value: number | number[]) =>
              handleNegative(value as number)
            }
          />
        </Box>
      </div>

      {/* questions */}
      <div className={styles.controlWrapper}>
        <div className={styles.controlHeader}>
          <h3 className={styles.questionsColor}>Questions</h3>
          <span>{questions}%</span>
        </div>
        <Box width="100%">
          <Slider
            tabIndex={6}
            name="questions"
            size="small"
            defaultValue={questions}
            aria-label="questions"
            valueLabelDisplay="off"
            min={0}
            max={100}
            marks={[
              { value: 100 - (neutral + negative + positive), label: 'max' },
            ]}
            value={questions}
            onChange={(event: Event, value: number | number[]) =>
              handleQuestions(value as number)
            }
          />
        </Box>
      </div>
      <div>
        <p className={styles.hint}>
          <span>Hint:</span> When settings are at 100%, reduce one slider to add
          to the other.
        </p>
      </div>
    </div>
  );
};

export default ProjectFormSettings;
