using Application.Activities;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class ActivitiesController : BaseApiController
    {

        [HttpGet] //api/activities
        public async Task<ActionResult<List<Activity>>> GetActivities()
        {
            return HandleResult(await Mediator.Send(new List.Query()));
        }

        [HttpGet("{id}")] //api/activities/id
        public async Task<IActionResult> GetActivity(Guid id)
        {
            return HandleResult(await Mediator.Send(new Details.Query{Id = id}));
        }

        [HttpPost]
        public async Task<IActionResult> CreateActivity(Activity activity) {
            await Mediator.Send(new Create.Command{ Activity = activity});

            return Ok( );
        }

        [HttpPut("{id}")] public async Task<IActionResult> Edit(Guid id, Activity activity) {
            activity.Id = id;
            HandleResult(await Mediator.Send(new Edit.Command{ Activity = activity }));
            return Ok();
        }

        [HttpDelete("{id}")] public async Task<IActionResult> Delete(Guid id) {
            HandleResult(await Mediator.Send(new Delete.Command{ Id = id }));
            return Ok();
        }
    }
}