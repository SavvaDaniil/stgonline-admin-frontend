import { Injectable } from '@angular/core';
import { SubscriptionEditDTO } from 'src/app/dto/subscription/SubscriptionEditDTO';
import { SubscriptionLiteDTO } from 'src/app/dto/subscription/SubscriptionLiteDTO';
import { constant } from 'src/app/util/GlobalVariables';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionService 
{

  constructor() { }

  public async update(
    subscription_id: number,
    subscription_name: string | null,

    ...

    jwt: string, 
    setIsLoading: (value: boolean) => void,
    setWarning: (value: string) => void,
    setSuccess: (value: string) => void,
  ): Promise<void>
  {
    setIsLoading(true);
    setWarning("");
    setSuccess("");
    try
    {
      await fetch(constant.baseDomain + "/api/admin/subscription/" + subscription_id, 
          {
              method : "PUT",
              headers: {
                'Authorization': 'Bearer '+ jwt, 
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                  "id" : subscription_id,
                  "name" : subscription_name,
                  ...
              })
          }
      )
      .then(res => res.json())
      .then((jsonAnswerStatus) => {
          if(...)
          {
            setSuccess("Успешно сохранено");
          } else if(jsonAnswerStatus.status === "error")
          {
            setWarning(jsonAnswerStatus.errors);
          } else 
          {
            setWarning("Неизвестная ошибка на сервере");
          }
        },
        (error) => {
            console.log(error);
            setWarning("Ошибка на стороне сервера");
        }
      )

    } catch(error)
    {
      console.log(error);
      setWarning("Неизвестная ошибка на сервере");
    } finally
    {
      setIsLoading(false);
    }
  }
  
  public async getEdit(
    subscriptionId: Number,
    jwt: string,
    setIsLoading: (value: boolean) => void,
    setIsError: (value: boolean) => void,
    setSubscriptionEditViewModel: (subscriptionEditViewModel: SubscriptionEditDTO) => void
  ): Promise<void>
  {
    setIsLoading(true);
    try
    {
      await fetch(constant.baseDomain + "/api/admin/subscription/" + subscriptionId, 
          {
              method : "GET",
              headers: {
                  'Authorization': 'Bearer '+ jwt, 
                  'Content-Type': 'application/json'
              }
          }
      )
      .then(res => res.json())
      .then((jsonAnswerStatus) => {
          console.log(jsonAnswerStatus);
          if(jsonAnswerStatus.status === "success" && ...)
          {
            setSubscriptionEditViewModel(jsonAnswerStatus.subscriptionEditViewModel);
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
  
  public async listLites(
    jwt: string,
    setIsLoading: (value: boolean) => void,
    setIsError: (value: boolean) => void,
    setSubscriptionLiteViewModels: (subscriptionLiteViewModels: Array<SubscriptionLiteDTO>) => void
  ): Promise<void>
  {
    setIsLoading(true);
    try
    {
      await fetch(constant.baseDomain + "/api/admin/subscription/list_lites", 
          {
              method : "GET",
              headers: {
                  'Authorization': 'Bearer '+ jwt, 
                  'Content-Type': 'application/json'
              }
          }
      )
      .then(res => res.json())
      .then((jsonAnswerStatus) => {
          console.log(jsonAnswerStatus);
          if(jsonAnswerStatus.status === "success" && ...)
          {
            setSubscriptionLiteViewModels(jsonAnswerStatus.subscriptionLiteViewModels);
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
