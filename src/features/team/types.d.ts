declare type MainQuestion = {
  id: number;
  img_url: string;
  points: number;
  question: string;
  audio_url: string;
  answers: {
    answer: string;
    is_correct: boolean;
    id: number;
  }[];
};

declare type MagicQuestion = {
  question: string;
  audio_url: string,
  answers: {
    answer: string;
    is_correct: boolean;
    id: number;
  }[];
};

declare type ServerTeamMessage =
  | {
    event: "experience_started";
    data: null;
  }
  | {
    event: "your_team";
    data: {
      name: string;
      score: number;
      won_phase1: boolean;
      used_magic_card: boolean;
      choosen_club: Club | null;
    };
  }
  | {
    event: "view_speed_question";
    data: {
      date: number;
      question: {
        question: string;
        audio_url: string,
        answers: {
          answer: string;
          is_correct: boolean;
          id: number;
        }[];
      };
    };
  }
  | {
    event: "speed_question_winner";
    data: {
      team: string;
      team_name: string;
    };
  }
  | {
    event: "list_main_questions";
    data: {
      hold: boolean;
      questions: MainQuestion[];
    };
  }
  | {
    event: "magic_card_question";
    data: {
      question: MagicQuestion;
    };
  }
  | {
    event: "winner";
    data: null;
  }
  | {
    event: "view_clubs";
    data: {
      clubs: Club[];
      hold: boolean;
    };
  }
  | {
    event: "unhold_choosing_club";
    data: {
      choosen_club_id: number;
    };
  }
  | {
    event: "unhold_choosing_main_question";
    data: {
      choosen_questions_ids: number[];
    };
  } | {
    event: "play_draw",
    data: null
  } | {
    event: "game_draw",
    data: null
  } | {
    event: 'play_speed_intro',
    data: null
  } | {
    event: 'game_terminated',
    data: null
  } | {
    event: 'play_speed_intro',
    data: null
  } | {
    event: 'hold_choosing_main_question',
    data: null
  } | {
    event: 'choosen_main_question',
    data: {
      question_id: number
    }
  } | {
    event: 'main_question_answer_result',
    data: {
      is_correct: boolean,
      question_id: number,
      answer_id: number
    }
  }
