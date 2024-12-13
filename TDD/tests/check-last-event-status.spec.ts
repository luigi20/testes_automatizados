class CheckLastEventStatus{
  constructor(private readonly loadEventRepository: ILoadLastEventRepository){}
  async perform(group_id : string):Promise<string>{
    await this.loadEventRepository.LoadLastVent(group_id);
    return 'done';
  }
}

interface ILoadLastEventRepository{
  LoadLastVent:(group_id:string)=>Promise<void>;
}

class LoadLastEventRepositorySpy implements ILoadLastEventRepository{
  group_id?:string;
  calls_count = 0;
  output: undefined;

  async LoadLastVent(group_id:string):Promise<undefined>{
    this.group_id = group_id;
    this.calls_count++;
    return this.output;
  }
}

describe('CheckLastEventStatus',()=>{
  it('should get last event data', async()=>{
    const loadLastEventRepository = new LoadLastEventRepositorySpy();
    const sut = new CheckLastEventStatus(loadLastEventRepository);
    await sut.perform('any_group_id');
    expect(loadLastEventRepository.group_id).toBe('any_group_id');
    expect(loadLastEventRepository.calls_count).toBe(1);
  })

  it('should get return status done when group has no event', async()=>{
    const loadLastEventRepository = new LoadLastEventRepositorySpy();
    loadLastEventRepository.output = undefined;
    const sut = new CheckLastEventStatus(loadLastEventRepository);
    const status = await sut.perform('any_group_id');
    expect(status).toBe('done');
  })
})