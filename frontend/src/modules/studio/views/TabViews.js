import {
  renderKpiTiles,
  renderGroupedCards,
  renderListView,
  renderDetailCard,
  renderYearCalendar,
} from "../../../core/ui/ViewBuilders.js";

export function renderStudioDashboard(root) {
  renderKpiTiles(root, [
    { label: "Active Campaigns", value: "14", meta: "3 launching this week" },
    { label: "Engagement", value: "42%", meta: "▲ 6% QoQ" },
    { label: "Content Queue", value: "28", meta: "12 awaiting review" },
    { label: "Journeys", value: "9", meta: "2 paused" },
  ]);

  renderGroupedCards(root, [
    {
      title: "Launch Readiness",
      cards: [
        {
          title: "Creative Approvals",
          items: ["Email template review", "Paid social variants"],
        },
        {
          title: "Audience Segments",
          items: ["High intent", "Dormant", "Partner referrals"],
        },
      ],
    },
    {
      title: "Performance Signals",
      cards: [
        { title: "CTR", value: "3.8%", status: "Above target" },
        { title: "Opt-out Rate", value: "0.4%", status: "Stable" },
      ],
    },
  ]);
}

export function renderStudioCampaigns(root) {
  renderListView(root, {
    title: "Campaigns",
    subtitle: "Studio campaigns across channels.",
    columns: [
      { key: "name", label: "Campaign" },
      { key: "channel", label: "Channel" },
      { key: "status", label: "Status" },
      { key: "owner", label: "Owner" },
    ],
    rows: [
      {
        name: "Spring Launch",
        channel: "Email",
        status: "Scheduled",
        owner: "Marketing Manager",
      },
      {
        name: "Product Retargeting",
        channel: "Paid Social",
        status: "Running",
        owner: "Digital Marketing",
      },
      {
        name: "Partner Webinar",
        channel: "Webinar",
        status: "Draft",
        owner: "Campaign Manager",
      },
    ],
  });

  renderDetailCard(root, {
    title: "Campaign Detail",
    subtitle: "Spring Launch",
    fields: [
      { label: "Goal", value: "Increase trial starts" },
      { label: "Audience", value: "High intent leads" },
      { label: "Start", value: "Mar 4, 2026" },
      { label: "Budget", value: "$18K" },
      { label: "Owner", value: "Marketing Manager" },
    ],
  });
}

export function renderStudioLeads(root) {
  renderListView(root, {
    title: "Lead Engagement",
    subtitle: "Studio-focused lead engagement queues.",
    columns: [
      { key: "name", label: "Lead" },
      { key: "source", label: "Source" },
      { key: "score", label: "Score" },
      { key: "status", label: "Status" },
    ],
    rows: [
      {
        name: "Omar Finch",
        source: "Webinar",
        score: "88",
        status: "Nurture",
      },
      {
        name: "Arielle Cruz",
        source: "Paid Social",
        score: "79",
        status: "Working",
      },
      {
        name: "Kenji Ito",
        source: "Partner",
        score: "73",
        status: "New",
      },
    ],
  });
}

export function renderStudioCalendar(root) {
  renderYearCalendar(root, {
    title: "Editorial Calendar",
    year: 2026,
    entries: [
      { month: 1, day: "22", label: "Blog series kickoff" },
      { month: 3, day: "08", label: "Product launch" },
      { month: 5, day: "19", label: "Partner webinar" },
      { month: 7, day: "14", label: "Customer stories" },
      { month: 9, day: "02", label: "Campaign refresh" },
      { month: 11, day: "16", label: "Holiday playbook" },
    ],
  });
}

export function renderStudioMessageEditor(root) {
  renderGroupedCards(root, [
    {
      title: "Template Library",
      cards: [
        { title: "Onboarding Email", status: "Ready" },
        { title: "Renewal Reminder", status: "Draft" },
        { title: "Event Invite", status: "Approved" },
      ],
    },
    {
      title: "Personalization",
      cards: [
        {
          title: "Dynamic Fields",
          items: ["First name", "Account tier", "Last activity"],
        },
        {
          title: "Preview States",
          items: ["Mobile", "Desktop", "Dark mode"],
        },
      ],
    },
  ]);
}

export function renderStudioContentScheduler(root) {
  renderGroupedCards(root, [
    {
      title: "Queue",
      cards: [
        { title: "Email nurture", value: "Mar 2" },
        { title: "Social burst", value: "Mar 4" },
        { title: "Webinar follow-up", value: "Mar 12" },
      ],
    },
    {
      title: "Automation",
      cards: [
        { title: "Journey Steps", value: "7 active" },
        { title: "Fallback Paths", value: "3 configured" },
      ],
    },
  ]);
}
