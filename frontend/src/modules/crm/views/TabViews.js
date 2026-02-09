import {
  renderKpiTiles,
  renderGroupedCards,
  renderListView,
  renderDetailCard,
  renderYearCalendar,
} from "../../../core/ui/ViewBuilders.js";

export function renderCrmDashboard(root) {
  const tiles = [
    { label: "Pipeline", value: "$2.4M", meta: "▲ 8% vs last month" },
    { label: "New Leads", value: "128", meta: "24 qualified today" },
    { label: "Open Deals", value: "56", meta: "12 in negotiation" },
    { label: "Forecast", value: "84%", meta: "On-track" },
  ];

  renderKpiTiles(root, tiles);

  renderGroupedCards(root, [
    {
      title: "Growth Plays",
      cards: [
        {
          title: "Top Accounts to Nurture",
          items: ["Acme Logistics", "Mariner Health", "Lumina Retail"],
        },
        {
          title: "Next Best Actions",
          items: ["Send renewal playbook", "Schedule QBR", "Review at-risk deal"],
        },
      ],
    },
    {
      title: "Team Pulse",
      cards: [
        { title: "Activity Volume", value: "312 touches", status: "Healthy" },
        { title: "Follow-ups Due", value: "18", status: "3 overdue" },
      ],
    },
  ]);
}

export function renderCrmCampaigns(root) {
  renderListView(root, {
    title: "Campaigns",
    subtitle: "Active CRM campaigns and engagement metrics.",
    columns: [
      { key: "name", label: "Campaign" },
      { key: "status", label: "Status" },
      { key: "responses", label: "Responses" },
      { key: "budget", label: "Budget" },
    ],
    rows: [
      {
        name: "FY26 Expansion Play",
        status: "Active",
        responses: "312",
        budget: "$24K",
      },
      {
        name: "Healthcare ABM",
        status: "Active",
        responses: "184",
        budget: "$18K",
      },
      {
        name: "Renewal Pulse",
        status: "Paused",
        responses: "96",
        budget: "$8K",
      },
    ],
  });

  renderDetailCard(root, {
    title: "Campaign Overview",
    subtitle: "FY26 Expansion Play",
    fields: [
      { label: "Owner", value: "CRM Manager" },
      { label: "Type", value: "Account-based" },
      { label: "Start", value: "Feb 10, 2026" },
      { label: "End", value: "Apr 30, 2026" },
      { label: "Targets", value: "120 accounts" },
      { label: "Success KPI", value: "12% conversion" },
    ],
  });
}

export function renderCrmLeads(root) {
  renderListView(root, {
    title: "Lead Pipeline",
    subtitle: "Qualified leads and routing insights.",
    columns: [
      { key: "name", label: "Lead" },
      { key: "company", label: "Company" },
      { key: "score", label: "Score" },
      { key: "owner", label: "Owner" },
    ],
    rows: [
      {
        name: "Priya Nair",
        company: "Orbit Analytics",
        score: "92",
        owner: "Business Development",
      },
      {
        name: "Diego Ramos",
        company: "Vertex Health",
        score: "86",
        owner: "Sales Account Manager",
      },
      {
        name: "Ava Chen",
        company: "Nexa Retail",
        score: "78",
        owner: "Business Development",
      },
    ],
  });

  renderDetailCard(root, {
    title: "Lead Profile",
    subtitle: "Priya Nair",
    fields: [
      { label: "Status", value: "Working" },
      { label: "Industry", value: "Analytics" },
      { label: "Region", value: "APAC" },
      { label: "Next Step", value: "Discovery call" },
      { label: "Last Touch", value: "Feb 8, 2026" },
    ],
  });
}

export function renderCrmOpportunities(root) {
  renderListView(root, {
    title: "Opportunities",
    subtitle: "Active opportunities with stage and value.",
    columns: [
      { key: "name", label: "Opportunity" },
      { key: "stage", label: "Stage" },
      { key: "amount", label: "Amount" },
      { key: "close", label: "Close Date" },
    ],
    rows: [
      {
        name: "Lumina Renewal",
        stage: "Negotiation",
        amount: "$420K",
        close: "Mar 15, 2026",
      },
      {
        name: "Mariner Expansion",
        stage: "Proposal",
        amount: "$310K",
        close: "Apr 02, 2026",
      },
      {
        name: "Vertex New Logo",
        stage: "Discovery",
        amount: "$190K",
        close: "Apr 28, 2026",
      },
    ],
  });

  renderDetailCard(root, {
    title: "Opportunity Snapshot",
    subtitle: "Lumina Renewal",
    fields: [
      { label: "Account", value: "Lumina Retail" },
      { label: "Owner", value: "Sales Account Manager" },
      { label: "Probability", value: "72%" },
      { label: "Next Step", value: "Legal review" },
      { label: "Forecast", value: "$420K" },
    ],
  });
}

export function renderCrmAccounts(root) {
  renderListView(root, {
    title: "Accounts",
    subtitle: "Strategic accounts with health scores.",
    columns: [
      { key: "name", label: "Account" },
      { key: "tier", label: "Tier" },
      { key: "health", label: "Health" },
      { key: "owner", label: "Owner" },
    ],
    rows: [
      {
        name: "Acme Logistics",
        tier: "Strategic",
        health: "Green",
        owner: "CRM Manager",
      },
      {
        name: "Vertex Health",
        tier: "Growth",
        health: "Yellow",
        owner: "Sales Account Manager",
      },
      {
        name: "Orbit Analytics",
        tier: "Core",
        health: "Green",
        owner: "Business Development",
      },
    ],
  });

  renderDetailCard(root, {
    title: "Account Snapshot",
    subtitle: "Acme Logistics",
    fields: [
      { label: "ARR", value: "$1.2M" },
      { label: "Renewal", value: "Jun 2026" },
      { label: "Engagement", value: "High" },
      { label: "Expansion", value: "3 open plays" },
    ],
  });
}

export function renderCrmContacts(root) {
  renderListView(root, {
    title: "Contacts",
    subtitle: "Key stakeholders across accounts.",
    columns: [
      { key: "name", label: "Contact" },
      { key: "title", label: "Title" },
      { key: "account", label: "Account" },
      { key: "phone", label: "Phone" },
    ],
    rows: [
      {
        name: "Lena Stone",
        title: "Head of Growth",
        account: "Lumina Retail",
        phone: "+1 555 0123",
      },
      {
        name: "Marcus Hale",
        title: "VP Operations",
        account: "Acme Logistics",
        phone: "+1 555 0441",
      },
      {
        name: "Priya Nair",
        title: "Director, Analytics",
        account: "Orbit Analytics",
        phone: "+1 555 0821",
      },
    ],
  });

  renderDetailCard(root, {
    title: "Contact Overview",
    subtitle: "Lena Stone",
    fields: [
      { label: "Email", value: "lena@eoex.dev" },
      { label: "Last Touch", value: "Feb 7, 2026" },
      { label: "Influence", value: "Economic buyer" },
      { label: "Notes", value: "Interested in multi-year renewal" },
    ],
  });
}

export function renderCrmTasks(root) {
  renderListView(root, {
    title: "Tasks",
    subtitle: "Open tasks and follow-up actions.",
    columns: [
      { key: "task", label: "Task" },
      { key: "owner", label: "Owner" },
      { key: "due", label: "Due" },
      { key: "priority", label: "Priority" },
    ],
    rows: [
      {
        task: "Send renewal proposal",
        owner: "CRM Manager",
        due: "Feb 10",
        priority: "High",
      },
      {
        task: "Update account plan",
        owner: "Sales Account Manager",
        due: "Feb 12",
        priority: "Medium",
      },
      {
        task: "Lead follow-up call",
        owner: "Business Development",
        due: "Feb 13",
        priority: "High",
      },
    ],
  });
}

export function renderCrmReports(root) {
  renderGroupedCards(root, [
    {
      title: "Revenue",
      cards: [
        { title: "Pipeline by Stage", items: ["Discovery", "Proposal", "Negotiation"] },
        { title: "Forecast Accuracy", value: "92%", status: "Improving" },
      ],
    },
    {
      title: "Performance",
      cards: [
        { title: "Win/Loss", value: "68%" },
        { title: "Top Segments", items: ["Healthcare", "Logistics", "Retail"] },
      ],
    },
  ]);
}

export function renderCrmCalendar(root) {
  renderYearCalendar(root, {
    title: "Sales Forecast Calendar",
    year: 2026,
    entries: [
      { month: 2, day: "10", label: "Pipeline review" },
      { month: 3, day: "15", label: "Quarterly forecast" },
      { month: 4, day: "02", label: "Board update" },
      { month: 6, day: "18", label: "Mid-year QBR" },
      { month: 9, day: "09", label: "Expansion summit" },
      { month: 11, day: "21", label: "Renewal sprint" },
    ],
  });
}
