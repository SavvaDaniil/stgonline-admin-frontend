import { Injectable } from '@angular/core';
import { AnalyticsDashboardSearchDTO } from 'src/app/dto/analytics/AnalyticsDashboardSearchDTO';
import { constant } from 'src/app/util/GlobalVariables';

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService 
{

  constructor() { }

  public async getAnalyticsDashboard(
    jwt: string,
    date_from: string,
    date_to: string,
    setIsLoading: (value: boolean) => void,
    setIsError: (value: boolean) => void,
    setAnalyticsDashboardSearchDTO: (analyticsDashboardSearchDTO: AnalyticsDashboardSearchDTO) => void
  ): Promise<void>
  {
    setIsLoading(true);
    setIsError(false);
    try
    {
      await fetch(constant.baseDomain + "/api/analytics/dashboard", 
          {
              method : "POST",
              headers: {
                'Authorization': 'Bearer '+ jwt, 
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                "date_from" : date_from,
                ...
              })
          }
      )
      .then(res => res.json())
      .then((jsonAnswerStatus) => {
          if(jsonAnswerStatus.status === "success" ...)
          {
            setAnalyticsDashboardSearchDTO(jsonAnswerStatus.analyticsDashboardSearchViewModel);
          } else 
          {
            setIsError(true);
          }
        },
        (error) => {
            console.log(error);
            setIsError(true);
        }
      )

    } catch(error)
    {
      console.log(error);
      setIsError(true);
    } finally
    {
      setIsLoading(false);
    }
  }
}
