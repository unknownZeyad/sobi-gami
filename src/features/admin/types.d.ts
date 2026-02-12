declare type MainQuestionAnswerResult = {
  score: number;
  is_correct: boolean;
  question_points: number;
  used_magic_card: boolean;
  team_name: string;
  club: Club;
  question_img: string
};

declare type ServerAdminMessage =
  | {
    event: "can_start";
    data: null;
  }
  | {
    event: "experience_started";
    data: null;
  }
  | {
    event: "unhold_choosing_club";
    data: {
      choosen_club_id: number;
    };
  }
  | {
    event: "main_question_answer_result";
    data: MainQuestionAnswerResult;
  }
  | {
    event: "unhold_choosing_main_question";
    data: {
      choosen_questions_ids: number[];
    };
  }
  | {
    event: "view_speed_question";
    data: {
      date: number;
      question: SpeedQuestion;
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
    event: "view_speed_question";
    data: {
      date: number;
      question: SpeedQuestion;
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
    event: "view_all_choosen_clubs";
    data: {
      team1_club: Club;
      team2_club: Club;
    };
  }
  | {
    event: "choosen_main_question";
    data: {
      team_name: string;
      question: MainQuestion;
      club: Club;
      score: number;
      used_magic_card: boolean;
    };
  }
  | {
    event: "winner";
    data: {
      name: string;
      score: number;
      club: Club;
    };
  } | {
    event: "clubs_chosen";
    data: {
      team1: {
        choosen_club: Club;
        image_url: string;
      };
      team2: {
        choosen_club: Club;
        image_url: string;
      };
      [key: string]: any;
    };
  } | {
    event: "play_draw",
    data: null
  } | {
    event: "game_draw",
    data: null
  } | {
    event: "unhold_draw",
    data: null
  } | {
    event: 'game_terminated',
    data: null
  } | {
    event: 'play_speed_intro',
    data: null
  } | {
    event: 'wait_for_clubs',
    data: null
  } | {
    event: 'main_questions_started',
    data: null
  }

