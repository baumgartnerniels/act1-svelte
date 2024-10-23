<script>
  import { createEventDispatcher } from "svelte";
  import Cross from "./icons/Cross.svelte";
  const dispatch = createEventDispatcher();

  function closeHelp() {
    dispatch("about", {});
  }
</script>

<article>
  <button class="close" on:click={closeHelp}><Cross /></button>
  <h1>About</h1>
  <h2>OECD South East Europe Regional Programme</h2>
  <p>
    Since 2000, the OECD South East Europe Regional Programme (SEERP) has been
    providing the region’s economies with comprehensive policy analysis and
    advice to boost sustainable and inclusive economic growth, and to facilitate
    the region’s socio-economic convergence with the OECD and European Union
    (EU).
  </p>
  <p>
    Using OECD methods, tools and standards, the SEERP has provided regular
    analytical assessments and policy recommendations to bolster competitiveness
    and regional integration, in close alignment with the region’s EU agenda. It
    also acts as the central entry point for the Western Balkans to tap into
    diverse policy advice from the OECD by facilitating engagement with OECD
    bodies and fostering co-operation between OECD members and regional
    stakeholders, including policy makers, business leaders and civil society.
  </p>
  <p>
    The SEERP uses a blend of data collection, comprehensive analysis,
    formulation of policy recommendations, exchange of best practices, public
    and private stakeholder dialogue, and capacity building to support policy
    making and reforms in the region. Its analytical products have become key
    reference documents informing policy-making processes. Its impact is
    underscored by several significant achievements, including its role in
    informing economic reform agendas. It has served as a vital analytical
    resource for processes such as EU accession and regional platforms such as
    the Berlin Process and the South East European Co-operation Process (SEECP).
    The programme also enhances regional co-operation and dialogue among peers
    and OECD member countries on cross-cutting policy issues.
  </p>
  <p>SEERP work areas include:</p>
  <ul>
    <li>
      Bolstering economic reforms and convergence through the Western Balkans
      Competitiveness Outlook 2024 and the Economic Convergence scoreboard.
    </li>

    <li>
      Strengthening private sector development through the Small Business Act
      Assessment SME Policy Index for the Western Balkans and Türkiye.
    </li>
    <li>Supporting the green and digital transition in the Western Balkans.</li>
    <li>
      Promoting fairness and fostering business integrity through the Fair
      Market Conditions for Competitiveness project.
    </li>
  </ul>
  <h2>
    Western Balkans Competitiveness Outlook: A tool for monitoring progress in
    building competitive economies
  </h2>
  <p>
    Funded by the European Union, the flagship regional publication series, the
    Western Balkans Competitiveness Outlook, is the most comprehensive
    assessment of economic reforms in the six Western Balkan economies: Albania,
    Bosnia and Herzegovina, Kosovo*, Montenegro, North Macedonia and Serbia.
    Since 2016 it has provided the region’s policy makers with a unique
    benchmarking tool, enabling them to compare economic policy performance over
    time and to design future policies based on robust evidence and actionable
    policy recommendations from OECD standards and good practices.
  </p>
  <p>
    The Competitiveness Outlook employs a participatory assessment method (see
    the Methodology section for more detailed information) aimed at fostering
    peer learning, consensus building on reform priorities and stakeholder
    co-ordination. This inclusive approach is reflected in the diverse
    stakeholders involved in assessment activities and contributes to robust
    data collection and facilitates constructive exchanges on concrete policy
    issues among stakeholders and with the OECD. Western Balkans Competitiveness
    Outlook 2024 The fourth edition of the Western Balkans Competitiveness
    Outlook 2024 covers 15 policy areas and introduces a novel approach that
    harnesses complementarities between these areas by organising findings into
    five policy clusters: 1) Infrastructure and connectivity; 2) Skills; 3)
    Business environment; 4) Digital Transformation; and 5) Greening. Assessment
    results are presented in distinct profiles for each Western Balkan economy
    that provide an economy-specific analysis of the 15 policy areas, providing
    actionable recommendations within each area for enhanced competitiveness.
    The regional profile offers insights into policy progress and challenges
    across the five clusters, monitoring the region’s convergence towards OECD
    and EU standards.
  </p>
  <p>
    These reports complement the Data Hub, which was prepared for the first time
    for this fourth edition and is designed to showcase the progress of
    individual economies and the region over time, enhancing the visualisation,
    accessibility and dissemination of the assessment results. Over time, the
    Data Hub is expected to integrate findings and results from other key OECD
    work streams to provide a comprehensive view of the region’s policy
    landscape in support of competitiveness.
  </p>

  <h2>Copyright</h2>
  <ul class="copyright">
    <li>Modul Act 1 – ‹Information Design in Motion›</li>
    <li>«Western Balkans Competitiveness Data Hub»</li>
    <li>16.09.–25.10.2024</li>
    <li>
      Student:innen: Adelina Kashtanjeva, Maisa Melezanovic, Niels Baumgartner
    </li>
    <li>Zusammenarbeit mit: Interactive Things</li>
    <li>
      Dozierende: Alain Leclerc von Bonin, Michael Flückiger, Gordan Savicic
    </li>
    <li>Modulleitung: Alain Leclerc von Bonin</li>
    <li>BA Data Design  + Art, Hochschule Luzern – Design Film Kunst</li>
    <li>© HSLU, 2024</li>
  </ul>
</article>

<style>
  article {
    text-align: left;
    overflow: scroll;
    padding-right: 2em;
  }
  .copyright {
    list-style-type: none;
    padding: 0;
  }
  .copyright li {
    padding-bottom: 0.2em;
  }
  article :global(svg) {
    fill: var(--main-color);
    display: inline;
    height: 1em;
    vertical-align: middle;
    padding-top: 1em;
  }
  .close {
    position: absolute;
    right: 0;
    padding-right: 2em;
    margin: 0;
    height: 1em;
    background-color: var(--background-color);
  }
</style>
