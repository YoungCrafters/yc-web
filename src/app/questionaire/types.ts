
export type QuestionType = 'multiple-choice' | 'text' | 'date' | 'address';

export interface Question {
  id: number;
  text: string;
  type: QuestionType;
  options?: string[];
}

export interface AddressAnswer {
  street: string;
  city: string;
  state: string;
  zipCode: string;
}

export const questions: Question[] = [
  {
    id: 1,
    text: "What is your industry or field of interest?",
    type: "multiple-choice",
    options: [
      "Personal development",
      "Professional growth",
      "Health tracking",
      "Other"
    ]
  },
  {
    id: 2,
    text: "Are you interested in being a mentor or are you a mentee looking for a mentor?",
    type: "multiple-choice",
    options: [
      "I am a Mentor",
      "I am a Mentee",
    ]
  },
  {
    id: 3,
    text: "Please describe your main goal from a mentoring relationship.",
    type: "text"
  },
  {
    id: 4,
    text: "Which features are most important to you?",
    type: "multiple-choice",
    options: [
      "Progress tracking",
      "Communication features",
      "Goal setting",
      "Networking opportunities",
      "Other"]
  },
  {
    id: 5,
    text: "What is your date of birth?",
    type: "date"
  },
  {
    id: 6,
    text: "What is your address?",
    type: "text"
  },
  {
    id: 5,
    text: "Is there anything else you'd like us to know about your needs?",
    type: "text"
  }

];

export type AnswerValue = string | Date | AddressAnswer | null;
export type Answers = {[key: number]: AnswerValue;}

export const states = [
                    'AL',
                    'AK',
                    'AZ',
                    'AR',
                    'CA',
                    'CO',
                    'CT',
                    'DE',
                    'FL',
                    'GA',
                    'HI',
                    'ID',
                    'IL',
                    'IN',
                    'IA',
                    'KS',
                    'KY',
                    'LA',
                    'ME',
                    'MD',
                    'MA',
                    'MI',
                    'MN',
                    'MS',
                    'MO',
                    'MT',
                    'NE',
                    'NV',
                    'NH',
                    'NJ',
                    'NM',
                    'NY',
                    'NC',
                    'ND',
                    'OH',
                    'OK',
                    'OR',
                    'PA',
                    'RI',
                    'SC',
                    'SD',
                    'TN',
                    'TX',
                    'UT',
                    'VT',
                    'VA',
                    'WA',
                    'WV',
                    'WI',
                    'WY',
                  ]