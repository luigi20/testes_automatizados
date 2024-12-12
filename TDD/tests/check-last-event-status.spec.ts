class CheckLastEventStatus{
  constructor(private readonly loadEventRepository: ILoadLastEventRepository){}
  async perform(group_id : string):Promise<void>{
    await this.loadEventRepository.LoadLastVent(group_id);
  }
}

interface ILoadLastEventRepository{
  LoadLastVent:(group_id:string)=>Promise<void>;
}

class LoadLastEventRepositoryMock implements ILoadLastEventRepository{
  group_id?:string;
  calls_count = 0;
  async LoadLastVent(group_id:string):Promise<void>{
    this.group_id = group_id;
    this.calls_count++;
  }
  
}

describe('CheckLastEventStatus',()=>{
  it('should get last event data', async()=>{
    const loadLastEventRepository = new LoadLastEventRepositoryMock();
    const checkLastEventStatus = new CheckLastEventStatus(loadLastEventRepository);
    await checkLastEventStatus.perform('any_group_id');
    expect(loadLastEventRepository.group_id).toBe('any_group_id');
    expect(loadLastEventRepository.calls_count).toBe(1);
  })
})