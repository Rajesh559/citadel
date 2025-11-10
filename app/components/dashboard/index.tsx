'use client';

import { useGetData } from '@/app/api';
import Card from '@/app/components/common/card';
import AzureSubscriptionCost from '@/app/components/dashboard/azure-subscription-cost';
import BlockedTasks from '@/app/components/dashboard/blocked-tasks';
import Bugs from '@/app/components/dashboard/bugs';
import BugsWithRespectToSeverity from '@/app/components/dashboard/bugs-with-respect-to-severity';
import Features from '@/app/components/dashboard/features';
import Header from '@/app/components/dashboard/header';
import Pbi from '@/app/components/dashboard/pbi';
import RemainingWork from '@/app/components/dashboard/remaining-work';
import SquadInsights from '@/app/components/dashboard/squad-insights';
import SupportTickets from '@/app/components/dashboard/support-tickets';
import TestAutomation from '@/app/components/dashboard/test-automation';
import TotalResources from '@/app/components/dashboard/total-resources';
import { useState } from 'react';
import BuildHistory from './build-history';
import FeatureTable from './features-table';

const Dashboard = () => {
  const { data } = useGetData();
  const {
    azure_subscription_cost,
    blocked_count,
    bugs,
    build_history,
    completed_details,
    current_sprint,
    features,
    end_date,
    pbis,
    release_version,
    remaining_work,
    resources,
    start_date,
    support_tickets,
    test_cases,
    timestamp,
    velocity,
  } = data || {};

  const [isFeatureTableOpen, setIsFeatureTableOpen] = useState(false);

  return (
    <>
      <Header
        completed_details={completed_details}
        current_sprint={current_sprint}
        end_date={end_date}
        start_date={start_date}
        timestamp={timestamp}
        release_version={release_version}
      />
      <main>
        <section className="grid grid-cols-1 gap-4 p-2 pt-4 md:grid-cols-2 xl:grid-cols-15 2xl:grid-cols-12">
          <Card
            title="FEATURES"
            className="xl:col-span-5 2xl:col-span-2"
            info={{
              content: (
                <FeatureTable
                  isOpen={isFeatureTableOpen}
                  setIsOpen={setIsFeatureTableOpen}
                  details={features?.details}
                  statusColors={[
                    { status: 'New', color: '#4a014a' },
                    {
                      status: 'In progress',
                      color: '#a13fa1',
                    },
                    { status: 'Done', color: '#e670e6' },
                  ]}
                />
              ),
              onClick: setIsFeatureTableOpen,
            }}
          >
            <Features features={features} />
          </Card>
          <Card title="PBI" className="xl:col-span-5 2xl:col-span-2">
            <Pbi pbis={pbis} />
          </Card>
          <Card title="BUGS" className="xl:col-span-5 2xl:col-span-2">
            <Bugs bugs={bugs} />
          </Card>
          <Card title="TEST AUTOMATION" className="xl:col-span-15 2xl:col-span-6" contentClassName="justify-start">
            <TestAutomation test_cases={test_cases} />
          </Card>
        </section>
        <section className="grid grid-cols-1 gap-4 p-2 2xl:grid-cols-3">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <Card title="BUGS WITH RESPECT TO SEVERITY">
              <BugsWithRespectToSeverity bugs={bugs} />
            </Card>
            <Card title="REMAINING WORK">
              <RemainingWork remaining_work={remaining_work} />
            </Card>
          </div>
          <div className="flex flex-col gap-4 md:flex-row 2xl:col-span-2">
            <Card title="EGW FIRMWARE">
              <BuildHistory history={build_history?.['egw-firmware']} />
            </Card>
            <Card title="EGW CLOUD">
              <BuildHistory history={build_history?.['egw-cloud']} />
            </Card>
            <Card title="ONPREM SOLUTION">
              <BuildHistory history={build_history?.['on-prem-solution']} />
            </Card>
          </div>
        </section>
        <section className="grid grid-cols-1 p-2 lg:gap-y-4 2xl:grid-cols-3 2xl:gap-x-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4 2xl:grid-cols-2">
            <Card title="TOTAL RESOURCES FOR TODAY">
              <TotalResources resources={resources} />
            </Card>
            <Card title="AZURE SUBSCRIPTION COST">
              <AzureSubscriptionCost
                prod={azure_subscription_cost?.prod}
                nonProd={azure_subscription_cost?.['non-prod']}
              />
            </Card>
            <Card title="BLOCKED TASKS">
              <BlockedTasks blocked_count={blocked_count} />
            </Card>
            <Card title="SUPPORT TICKETS">
              <SupportTickets support_tickets={support_tickets} />
            </Card>
          </div>
          <div className="col-span-2 mt-4 lg:mt-0">
            <Card title="SQUAD INSIGHTS">
              <SquadInsights teams={velocity?.teams} />
            </Card>
          </div>
        </section>
      </main>
    </>
  );
};

export default Dashboard;
